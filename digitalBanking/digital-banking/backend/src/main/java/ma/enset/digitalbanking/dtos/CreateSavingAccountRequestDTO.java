package ma.enset.digitalbanking.dtos;

import lombok.Data;

@Data
public class CreateSavingAccountRequestDTO {
    private double initialBalance;
    private double interestRate;
    private Long customerId;
} 