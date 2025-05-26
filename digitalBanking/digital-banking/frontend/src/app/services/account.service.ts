import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AccountDetails } from '../model/account.model';
import { BankAccount, CurrentBankAccount, SavingBankAccount } from '../model/bank-account.model';
import { CreateCurrentAccountRequest, CreateSavingAccountRequest } from '../model/account-request.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccountDetails(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public getBankAccount(accountId: string): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${environment.backendHost}/accounts/${accountId}`);
  }

  public listAccounts(): Observable<Array<BankAccount>> {
    return this.http.get<Array<BankAccount>>(environment.backendHost + "/accounts");
  }

  public saveCurrentBankAccount(request: CreateCurrentAccountRequest): Observable<CurrentBankAccount> {
    return this.http.post<CurrentBankAccount>(environment.backendHost + '/accounts/current', request);
  }

  public saveSavingBankAccount(request: CreateSavingAccountRequest): Observable<SavingBankAccount> {
    return this.http.post<SavingBankAccount>(environment.backendHost + '/accounts/saving', request);
  }

  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.backendHost+"/accounts/transfer",data);
  }
}
