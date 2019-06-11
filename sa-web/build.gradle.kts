import com.moowork.gradle.node.npm.NpmTask

plugins {
    war
	id("org.springframework.boot")
	id("com.moowork.node") version "1.2.0"
}

apply(plugin = "io.spring.dependency-management")

dependencies {
    implementation(project(":sa-common"))
    implementation(project(":sa-dao"))
    implementation(project(":sa-business"))
    implementation(project(":sa-security"))
    implementation("javax.servlet:javax.servlet-api:4.0.1")
	implementation("javax.servlet.jsp:javax.servlet.jsp-api:2.3.3")
	implementation("javax.servlet:jstl:1.2")
    implementation("org.apache.commons:commons-lang3:3.8.1")    
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
	runtimeOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
}

node{
	version = "12.1.0"
	npmVersion = "6.9.0"
	download = true
	nodeModulesDir = file("${project.projectDir}")
}

tasks.register<NpmTask>("npmBuild") {
	dependsOn("npm_install")
	setArgs(listOf("run","build"))
}

tasks {
  "compileJava" {
    dependsOn("npmBuild")
    }
}

