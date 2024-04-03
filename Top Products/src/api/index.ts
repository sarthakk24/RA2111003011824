import { Router } from 'express'
import healthCheckRoute from './healthcheck'

export default (): Router => {
    const app = Router()
    app.use('/health', healthCheckRoute)
    return app
}
