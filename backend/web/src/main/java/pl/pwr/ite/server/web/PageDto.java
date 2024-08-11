package pl.pwr.ite.server.web;

import jakarta.persistence.Access;
import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.Mapper;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.util.Collection;

@Data
public class PageDto<T> {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private Mapper contentMapper;
    }

    private Collection<T> content;

    private Long totalElements;

    private int pageNumber;

    private Integer totalPages;

    private int numberOfElements;
}
