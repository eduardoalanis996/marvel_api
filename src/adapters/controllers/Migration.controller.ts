import { container } from "../../AppContainer"
import { MigrationService } from "../../application/services/Migration.service"

const migrationService = container.resolve<MigrationService>('migrationService')


export class MigrationController{

    async test(req:any, res: any){
       // console.log(req)
       await migrationService.synchronize()
        res.send('Hello')
    }


}