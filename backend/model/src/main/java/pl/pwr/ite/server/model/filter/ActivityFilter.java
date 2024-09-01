package pl.pwr.ite.server.model.filter;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityFilter extends Filter {

    private LocalDateTime date;
}
