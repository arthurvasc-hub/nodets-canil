import express from 'express'
import dotenv from 'dotenv'
import mustache from 'mustache-express'
import path from 'path'
import mainRoutes from './routes/index'

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const server = express();
// Configura a template engine Mustache
server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache())
// Serve arquivos estáticos do diretório 'public'
server.use(express.static(path.join(__dirname, '../public')));

// Usa as rotas definidas no arquivo ./routes/index
server.use(mainRoutes);
// Middleware para tratar páginas não encontradas
server.use((req, res)=> {
  res.render('pages/404')
})
// Inicia o servidor na porta definida na variável de ambiente
const PORT = process.env.PORTA || 3000 // Usa a porta definida ou a 3000 por padrão
server.listen(PORT, () =>{
  console.log(`Servidor rodando na porta ${PORT}`)
})