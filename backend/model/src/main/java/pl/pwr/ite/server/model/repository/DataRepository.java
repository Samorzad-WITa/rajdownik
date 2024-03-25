package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Data;

import java.util.UUID;

public interface DataRepository extends JpaRepository<Data, UUID> {
}
