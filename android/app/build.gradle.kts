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
}

tasks.named("preBuild") { dependsOn(copyWeb) }

dependencies {
    implementation("androidx.webkit:webkit:1.12.1")
}
