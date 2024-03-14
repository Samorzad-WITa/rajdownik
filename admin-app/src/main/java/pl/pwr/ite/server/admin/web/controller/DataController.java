package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.admin.web.dto.DataDto;
import pl.pwr.ite.server.admin.web.dto.EventDto;
import pl.pwr.ite.server.admin.web.service.DataFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController implements InitializingBean {

    private final DataFacade dataFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(DataDto.Properties.class);
        defaultListProperties = mappingService.createProperties(DataDto.Properties.class);
    }

    @PostMapping
    public ResponseEntity<DataDto> create(DataDto dto) {
        return ResponseEntity.ok(dataFacade.map(dataFacade.create(dto), defaultSingleProperties));
    }
}
