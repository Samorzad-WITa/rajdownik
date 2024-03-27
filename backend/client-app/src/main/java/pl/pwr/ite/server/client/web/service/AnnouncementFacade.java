package pl.pwr.ite.server.client.web.service;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.AnnouncementDto;
import pl.pwr.ite.server.client.web.mapper.AnnouncementMapper;
import pl.pwr.ite.server.model.entity.Announcement;
import pl.pwr.ite.server.service.AnnouncementService;
import pl.pwr.ite.server.web.EntityServiceFacade;

@Component
public class AnnouncementFacade extends EntityServiceFacade<Announcement, AnnouncementService, AnnouncementDto, AnnouncementDto.Properties, AnnouncementMapper> {
    public AnnouncementFacade(AnnouncementService service, AnnouncementMapper mapper) {
        super(service, mapper);
    }


}
