import java.util.Properties

plugins {
    id("com.android.application")
}

// The web app lives in the repo root; copy it into the APK's assets on every build
val webRoot = rootProject.projectDir.parentFile
val copyWeb by tasks.registering(Sync::class) {
    from(webRoot) {
        include("index.html", "clock.css", "clock.png", "src/**", "fonts/**")
    }
    into(layout.buildDirectory.dir("web/www"))
}
val keystoreProps = Properties().apply {
    rootProject.file("keystore.properties").takeIf {
        it.exists()
    }?.inputStream()?.use(::load)
}

android {
    namespace = "pl.arimseventh.clock"
    compileSdk = 36

    defaultConfig {
        applicationId = "pl.arimseventh.clock"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    sourceSets["main"].assets.srcDir(layout.buildDirectory.dir("web"))

    signingConfigs {
        create("release") {
            storeFile = keystoreProps.getProperty("storeFile")?.let(::file)
            storePassword = keystoreProps.getProperty("storePassword")
            keyAlias = keystoreProps.getProperty("keyAlias")
            keyPassword = keystoreProps.getProperty("keyPassword")
        }
    }
    buildTypes {
        release { signingConfig = signingConfigs.getByName("release") }
    }
}

tasks.named("preBuild") { dependsOn(copyWeb) }

dependencies {
    implementation("androidx.webkit:webkit:1.12.1")
}
