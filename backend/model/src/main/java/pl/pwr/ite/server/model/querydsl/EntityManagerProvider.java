package pl.pwr.ite.server.model.querydsl;

import jakarta.persistence.EntityManager;

public interface EntityManagerProvider {

    EntityManager getEntityManager();
}
