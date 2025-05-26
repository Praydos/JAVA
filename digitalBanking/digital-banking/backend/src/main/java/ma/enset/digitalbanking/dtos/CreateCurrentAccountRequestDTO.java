package ma.enset.digitalbanking.dtos;

import lombok.Data;

@Data
public class CreateCurrentAccountRequestDTO {
    private double initialBalance;
    private double overDraft;
    private Long customerId;
} 