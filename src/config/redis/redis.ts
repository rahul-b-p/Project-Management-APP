import { createClient } from '@redis/client';
import { logger } from '../../utils/logger';


const redisClient = createClient({
    url: 'redis://:your_secure_password@127.0.0.1:6379',
});


(async () => {
    if (!redisClient.isOpen) {
        try {
            await redisClient.connect();
            logger.info('Connected to Redis');
        } catch (err) {
            logger.error('Failed to connect to Redis:', err);
        }
    }
})();

export default redisClient;