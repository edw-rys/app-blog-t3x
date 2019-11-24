// Imports necesarios
import {ModuleWithProviders} from "@angular/core";
import { Routes , RouterModule } from "@angular/router";

// Importar componentes
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { CategoryNewComponent } from "./components/category-new/category-new.component";
// Definir las rutas
const appRoutes : Routes =
    [
        {
            path        :'',
            component   :HomeComponent
        },
        {
            path        :'inicio',
            component   :HomeComponent
        },
        {
            path        :'login',
            component   :LoginComponent
        },
        {
            path        :'signup',
            component   :SignupComponent
        },
        {
            path        :'logout/:sure',
            component   :LoginComponent
        },
        {
            path        :'setting',
            component   :UserEditComponent
        },
        {
            path        :'new-category',
            component   :CategoryNewComponent
        },
        {
            path        :'**', // no existe
            component   :NotFoundComponent
        }
    ];
// Exportar configuración
export const appRoutingProviders : any[]   = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
