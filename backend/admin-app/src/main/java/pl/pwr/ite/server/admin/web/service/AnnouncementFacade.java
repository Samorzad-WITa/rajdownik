package pl.pwr.ite.server.admin.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.AnnouncementDto;
import pl.pwr.ite.server.admin.web.mapper.AnnouncementMapper;
import pl.pwr.ite.server.model.entity.Announcement;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.model.filter.AnnouncementFilter;
import pl.pwr.ite.server.service.AnnouncementService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.UUID;

@Component
public class AnnouncementFacade extends EntityServiceFacade<Announcement, AnnouncementFilter, AnnouncementService, AnnouncementDto, AnnouncementDto.Properties, AnnouncementMapper> {

    public AnnouncementFacade(AnnouncementService service, AnnouncementMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
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
