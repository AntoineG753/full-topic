import express from 'express';
import helmet from 'helmet';
import userRoutes from './routes/users.js';
import categoryRoutes from './routes/category.js';
import subCategoryRoutes from './routes/subCategory.js';
import chatRoomRoutes from './routes/chatRoom.js';
import searchRoutes from './routes/search.js';

const app = express();


app.use(helmet());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.urlencoded({ extended: true }))
app.use(express.json());  


app.use('/pictures', express.static('pictures'));
app.use('/api/auth', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subCategory', subCategoryRoutes);
app.use('/api/chatRoom', chatRoomRoutes);
app.use('/api/search', searchRoutes);

 export default app;