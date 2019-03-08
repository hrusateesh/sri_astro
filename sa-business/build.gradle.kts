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
	implementation("org.jasypt:jasypt:1.9.2")
	implementation("org.jasypt:jasypt-springsecurity3:1.9.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
