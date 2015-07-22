name := "smp-vms"

version := "1.0"

lazy val `smp-vms` = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(javaJdbc, javaEbean, cache, javaWs, "com.google.inject" % "guice" % "4.0-beta",
"postgresql" % "postgresql" % "9.1-901-1.jdbc4","mysql" % "mysql-connector-java" % "5.1.18")

unmanagedResourceDirectories in Test <+= baseDirectory(_ / "target/web/public/test")