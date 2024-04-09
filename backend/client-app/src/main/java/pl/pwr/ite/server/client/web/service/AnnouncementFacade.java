package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.dto.AnnouncementDto;
import pl.pwr.ite.server.client.web.mapper.AnnouncementMapper;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.entity.Announcement;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.service.AnnouncementService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.UUID;

@Component
public class AnnouncementFacade extends EntityServiceFacade<Announcement, AnnouncementService, AnnouncementDto, AnnouncementDto.Properties, AnnouncementMapper> {

    private final SecurityFacade securityFacade;

    public AnnouncementFacade(AnnouncementService service, AnnouncementMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper);
        this.securityFacade = securityFacade;
    }

    @Transactional
    public Announcement create(AnnouncementDto dto) {
        securityFacade.checkAccess(Permission.AnnouncementEdit);

        var announcement = new Announcement();
        announcement.setDescription(dto.getDescription());
        announcement.setTitle(dto.getTitle());

        return saveAndFlush(announcement);
    }

    @Transactional
    public Announcement update(UUID id, AnnouncementDto dto) {
        var announcement = getById(id);
        if(announcement == null) {
            throw new ApplicationException(ApplicationError.AnnouncementNotFound);
        }
        securityFacade.checkAccess(Permission.ActivityEdit);

        announcement.setDescription(dto.getDescription());
        announcement.setTitle(dto.getTitle());

        return saveAndFlush(announcement);
    }

    @Transactional
    public void delete(UUID id) {
        var announcement = getById(id);
        if(announcement == null) {
            throw new ApplicationException(ApplicationError.AnnouncementNotFound);
        }
        securityFacade.checkAccess(Permission.AnnouncementEdit);
        getService().deleteById(id);
    }

}
