plugins {
    `java-library`
    id("org.springframework.boot")
}

apply(plugin = "io.spring.dependency-management")

tasks.getByName<Jar>("jar") {
	enabled = true
}

tasks.getByName<Jar>("bootJar") {
	enabled = false
}

dependencies {
    implementation(project(":sa-common"))
    compile("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.postgresql:postgresql")
}
