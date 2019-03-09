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
    implementation(project(":sa-dao"))
    implementation("org.apache.commons:commons-lang3:3.8.1")
    implementation("javax.servlet:javax.servlet-api:4.0.1")
    implementation("org.springframework.boot:spring-boot-starter-security")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
