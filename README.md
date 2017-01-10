- O que vale destacar no codigo implementado?

	O codigo foi implementado utilizando 100% angularjs, incluindo as mascaras de data e hora. 
	Cada pagina possui sua classe controller separada, o que foi feito para facilitar o debbug e a manutencao do sistema. 	
	O sistema foi feito para ser um single page application, ou seja, nao ha reloading de paginas. Para isso, foi utilizado o ngRoute.
		

- O que poderia ser feito para melhorar o sistema?

	Poderia ser utilizado algum sistema de auto complete ou sugestoes baseadas em compromissos anteriores para agilizar o cadastro.
	Tambem seria interessante integrar o sistema com celulares ou com algum servidor de email, para que fosse possivel enviar notificacoes para os usuarios assim que algum compromisso se aproximasse.
	Infelizmente criar interfaces nao e meu ponto forte, acho que ela poderia ser melhorada para ser bem mais intuitiva.
		
- Algo a mais que voce tenha a dizer: 

	Pude aproveitar essa chance para fazer testes automatizados pela primeira vez, pois nunca antes tinha tido contato com qualquer tipo de teste. Achei incrivel assistir os testes serem feitos e gostaria de ter utilizado anteriormente em minha vida!
 	Lamentavelmente isso faz com que meus testes possam estar incompletos, mas posso garantir que, com uma orientacao apropriada, irei aprender a aplica-los corretamente e assim definitivamente utiliza-los sempre no meu dia a dia!
	O servico utilizado para os dados fake (mockable.io) nao permitia que fosse salva nenhuma informacao, alem de nao retornar dados por id. Isso fez com que os dados ficassem estaticos, mas os servicos estao funcionando corretamente.