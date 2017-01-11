describe('Tests', function() {
    var new_button =  element(by.id('new_button'));
    var title = element(by.model('title'));
    var begin_date = element(by.model('begin_date'));
    var begin_time = element(by.model('begin_time'));
    var end_date = element(by.model('end_date'));
    var end_time = element(by.model('end_time'));
    var detail = element(by.model('detail'));
    var save_button = element(by.id('save'));
    var row = element(by.binding('list.title'));
    var delete_button = element(by.css('.btn-delete'));
    var modal_button = element(by.id('modal_button'));

    beforeEach(function() {
    	browser.get('http://localhost/#/');
    });

	it('should say 2', function() {    
    expect(element(by.binding('count_commitment')).getText()).
        toEqual('2'); 
  });
  
  it('should save with no detail and no error', function() {    
    new_button.click();
    title.sendKeys('teste');
    begin_date.sendKeys(12122016);
    begin_time.sendKeys(1200);
    end_date.sendKeys(13122016);
    end_time.sendKeys(1830);
    save_button.click();   

    expect(element(by.binding('alert_field')).getText()).
        toEqual('Salvo!'); 
  });

  it('should save with detail and no error', function() {    
    new_button.click();
    title.sendKeys('teste');
    begin_date.sendKeys(12122016);
    begin_time.sendKeys(1200);
    end_date.sendKeys(13122016);
    end_time.sendKeys(1830);
    detail.sendKeys('teste detalhe');
    save_button.click();   

    expect(element(by.binding('alert_field')).getText()).
        toEqual('Salvo!'); 
  });

  it('should show title error', function() {    
    new_button.click();   
    begin_date.sendKeys(12122016);
    begin_time.sendKeys(1200);
    end_date.sendKeys(13122016);
    end_time.sendKeys(1830);
    save_button.click();    

    expect(element(by.binding('alert_field')).getText()).
        toEqual('O campo título é obrigatório'); 
  });

  it('should show begin date error', function() {    
    new_button.click();  
    title.sendKeys('teste');   
    begin_time.sendKeys(1200);
    end_date.sendKeys(13122016);
    end_time.sendKeys(1830);
    save_button.click();    

    expect(element(by.binding('alert_field')).getText()).
        toEqual('O campo data de início é obrigatório'); 
  });

   it('should show end date error', function() {    
    new_button.click();  
    title.sendKeys('teste');   
    begin_time.sendKeys(1200);
    begin_date.sendKeys(13122016);
    end_time.sendKeys(1830);
    save_button.click();    

    expect(element(by.binding('alert_field')).getText()).
        toEqual('O campo data de término é obrigatório'); 
  });

  it('should show begin time error', function() {    
    new_button.click();  
    title.sendKeys('teste');   
    begin_date.sendKeys(12122016);    
    end_date.sendKeys(13122016);
    end_time.sendKeys(1830);
    save_button.click();    

    expect(element(by.binding('alert_field')).getText()).
        toEqual('O campo horário de início é obrigatório'); 
  });

  it('should show end time error', function() {    
    new_button.click();  
    title.sendKeys('teste');   
    begin_date.sendKeys(12122016);    
    end_date.sendKeys(13122016);
    begin_time.sendKeys(1830);
    save_button.click();    

    expect(element(by.binding('alert_field')).getText()).
        toEqual('O campo horário de término é obrigatório'); 
  });

  it('should show wrong time error', function() {    
    new_button.click();
    title.sendKeys('teste');
    begin_date.sendKeys(12122016);
    begin_time.sendKeys(5500);
    end_date.sendKeys(13122016);
    end_time.sendKeys(1830);
    save_button.click();     

    expect(element(by.binding('alert_field')).getText()).
        toEqual('Horário incorreto'); 
  });

  it('should show wrong time error again', function() {    
    new_button.click();
    title.sendKeys('teste');
    begin_date.sendKeys(12122016);
    begin_time.sendKeys(1200);
    end_date.sendKeys(13122016);
    end_time.sendKeys(5530);
    save_button.click();     

    expect(element(by.binding('alert_field')).getText()).
        toEqual('Horário incorreto'); 
  });

    it('should show wrong date error', function() {    
    new_button.click();
    title.sendKeys('teste');
    begin_date.sendKeys(12122016);
    begin_time.sendKeys(1100);
    end_date.sendKeys(13202016);
    end_time.sendKeys(1830);
    save_button.click();     

    expect(element(by.binding('alert_field')).getText()).
        toEqual('Data Incorreta'); 
  });

  it('should show wrong date error again', function() {    
    new_button.click();
    title.sendKeys('teste');
    begin_date.sendKeys(34122016);
    begin_time.sendKeys(1200);
    end_date.sendKeys(13122016);
    end_time.sendKeys(1130);
    save_button.click();     

    expect(element(by.binding('alert_field')).getText()).
        toEqual('Data Incorreta'); 
  });

   it('should open delete modal', function() {    
    delete_button.click(); 
    expect(element(by.id('modal_h3')).getText()).
        toEqual('Deletar'); 
  });

   it('should open detail by clicking row', function() {    
    row.click(); 
    title.sendKeys('teste');
    save_button.click();
    expect(element(by.binding('alert_field')).getText()).
        toEqual('Salvo!'); 
  });

   it('should delete with success', function() {    
     delete_button.click(); 
     modal_button.click();
     expect(element(by.binding('alert_msg')).getText()).
        toEqual('Item deletado com sucesso!'); 
  });

});