package pl.arimseventh.clock;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

/**
 * Fullscreen WebView showing the clock from the APK's assets.
 * Assets are served under a real https origin, because ES modules
 * don't load from file:// URLs.
 */
public class MainActivity extends Activity {
    private static final String START_URL = "https://appassets.androidplatform.net/www/index.html";
    private static final long NAV_DIM_DELAY_MS = 5000;
    /** Backlight level of the nightstand mode; 0 would let some phones switch the screen off */
    private static final float NIGHTSTAND_BRIGHTNESS = 0.01f;

    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable dimNavigation = () -> setNavigationDimmed(true);
    private WebView web;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // WebView has no Screen Wake Lock API, so keep the screen on natively
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        if ((getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
            WebView.setWebContentsDebuggingEnabled(true); // chrome://inspect
        }

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        web = new WebView(this);
        web.setBackgroundColor(Color.BLACK);
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true); // localStorage keeps the chosen color
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
        });
        // Lets the page tell it runs in the app; the clock's own assets are all it ever loads
        web.addJavascriptInterface(new Bridge(), "ClockApp");

        setContentView(web);
        // The old Black theme leaves the bar background to the system, and One UI then
        // paints it light grey in light mode; take it over so the black page shows through
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        getWindow().setNavigationBarColor(Color.BLACK);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            // No translucent scrim behind the nav buttons; keep the bar as black as the page
            getWindow().setNavigationBarContrastEnforced(false);
        }
        if (savedInstanceState == null) {
            web.loadUrl(START_URL);
        } else {
            web.restoreState(savedInstanceState);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        web.saveState(outState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
    }

    @Override
    protected void onPause() {
        handler.removeCallbacks(dimNavigation);
        web.onPause();
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        web.destroy();
        super.onDestroy();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            wakeNavigation();
        }
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent event) {
        if (event.getActionMasked() == MotionEvent.ACTION_DOWN) {
            wakeNavigation();
        }
        return super.dispatchTouchEvent(event);
    }

    /** Called from the page */
    private class Bridge {
        /** Nightstand mode: turn the backlight down to the minimum, or back to the system setting */
        @JavascriptInterface
        public void setDimmed(boolean dimmed) {
            runOnUiThread(() -> {
                WindowManager.LayoutParams params = getWindow().getAttributes();
                params.screenBrightness = dimmed
                        ? NIGHTSTAND_BRIGHTNESS
                        : WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE;
                getWindow().setAttributes(params);
            });
        }
    }

    /** Show the nav buttons at full brightness, then dim them after a while without touches. */
    private void wakeNavigation() {
        setNavigationDimmed(false);
        handler.removeCallbacks(dimNavigation);
        handler.postDelayed(dimNavigation, NAV_DIM_DELAY_MS);
    }

    /**
     * There is no API to dim the nav bar, so "dimmed" asks for the dark icons
     * meant for light bars: on the black page they read as faint grey.
     * The status bar stays hidden either way.
     */
    private void setNavigationDimmed(boolean dimmed) {
        int flags = View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
        if (dimmed) {
            flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
        }
        web.setSystemUiVisibility(flags);
    }
}
