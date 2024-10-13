package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityRegistrationDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityRegistration;

@Component
@RequiredArgsConstructor
public class ActivityRegistrationMapper extends MapperBase<ActivityRegistration, ActivityRegistrationDto, ActivityRegistrationDto.Properties> {

    private final ActivityEntryMapper activityEntryMapper;

    @Override
    public void transform(ActivityRegistration source, ActivityRegistrationDto destination, ActivityRegistrationDto.Properties properties) {
        destination.setId(source.getId());
        destination.setTitle(source.getTitle());
        destination.setActive(source.getActive());

        if(properties.isIncludeDetails()) {
            destination.setTeamSizeLimit(source.getTeamSizeLimit());
            destination.setRequireFullTeam(source.getRequireFullTeam());
            destination.setTermsAndRulesUrl(source.getTermsAndRulesUrl());
            destination.setStartTime(source.getStartTime());
        }

        if(properties.isIncludeEntries()) {
            map(destination::setEntries, source.getEntries(), activityEntryMapper, properties);
        }
    }
}
