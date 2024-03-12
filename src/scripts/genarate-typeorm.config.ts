import { ConfigService } from '@nestjs/config';
import fs = require('fs');
import { dataSourceOptions } from 'src/database/data-source';

/**
 * This script will generate the ormconfig.json based on your Global Config
 * @param config Config Service for accessing the ENV Variables
 */
const generateTypeormConfigFile = () => {
  const typeormConfig = dataSourceOptions;
  fs.writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));
};

export default generateTypeormConfigFile;
