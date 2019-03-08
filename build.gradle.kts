group = "com.sa"
version = "1.0-SNAPSHOT"

buildscript {
	val springBoot_version by extra { "2.1.3.RELEASE" }

    repositories {
    	jcenter()
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:$springBoot_version")
    }
}

subprojects {
    repositories {
    	jcenter()
        mavenCentral()
    }
}