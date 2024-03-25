package pl.pwr.ite.server.admin;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.pwr.ite.server.admin.properties.AdminProperties;

@SpringBootApplication(scanBasePackages = "pl.pwr.ite.server")
@EntityScan(basePackages = "pl.pwr.ite.server")
@EnableJpaRepositories(basePackages = "pl.pwr.ite.server")
@EnableConfigurationProperties(AdminProperties.class)
public class AdminApplication {

    private static final String APP_ID = "admin-app";

    private static class AppIdInitializer implements ApplicationContextInitializer {

        @Override
        public void initialize(ConfigurableApplicationContext applicationContext) {
            applicationContext.setId(APP_ID);
        }
    }

    public static void main(String... args) {
        new SpringApplicationBuilder(AdminApplication.class)
                .initializers(new AppIdInitializer())
                .run(args);
    }
}
