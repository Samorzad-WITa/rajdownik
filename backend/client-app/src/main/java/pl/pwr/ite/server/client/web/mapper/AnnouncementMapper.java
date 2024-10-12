package pl.pwr.ite.server.client.web.mapper;

import org.aspectj.weaver.AnnotationNameValuePair;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.AnnouncementDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.Announcement;

@Component
public class AnnouncementMapper extends MapperBase<Announcement, AnnouncementDto, AnnouncementDto.Properties> {

    @Override
    public void transform(Announcement source, AnnouncementDto destination, AnnouncementDto.Properties properties) {
        destination.setTitle(source.getTitle());
        destination.setId(source.getId());

        if(properties.isIncludeDescription()) {
            destination.setDescription(source.getDescription());
        }
    }
}
