FROM openjdk:11
WORKDIR /app
COPY target/expense-0.0.1-SNAPSHOT.jar /app/expense.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/expense.jar"]
