
import { Controller, Post, Get, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pontuacao } from 'src/pontuacao.entity'; 
@Controller('api')
export class AppController {
  constructor(
    @InjectRepository(Pontuacao)
    private pontuacaoRepository: Repository<Pontuacao>,
  ) { }

  @Post('/salvar-pontuacao')

  async salvarPontuacao(@Body() data: { playerName: string; score: number }) {
    try {
      const pontuacao = this.pontuacaoRepository.create(data);
      await this.pontuacaoRepository.save(pontuacao);
      
      return { mensagem: 'Pontuação salva com sucesso!' };
    } catch (error) {
      console.error('Erro ao salvar pontuação:', error.message);
      return { mensagem: 'Erro ao salvar pontuação' };
    }
  }
  @Get('/busca-pontuacao')
  async buscaPontuacao() {
    
    return await this.pontuacaoRepository.query("SELECT id,player_name as playerName,score,ROW_NUMBER() OVER (ORDER BY Score DESC) AS position FROM hscores order by score desc limit 10;");
   

  }
}
