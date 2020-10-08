import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                loadChildren: () =>
                    import('../social/social.module').then((m) => m.SocialPageModule),
            },
            {
                path: 'tab2',
                loadChildren: () =>
                    import ('../news/news.module').then((m) => m.NewsPageModule)
            },
            {
                path: 'tab3',
                loadChildren: () =>
                    import ('../primopiano/primopiano.module').then((m) => m.PrimopianoPageModule)
            },
            {
                path: 'tab4',
                loadChildren: () =>
                    import('../campionato/campionato.module').then((m) => m.CampionatoPageModule),
            },
            {
                path: 'tab5',
                loadChildren: () =>
                    import('../team/team.module').then((m) => m.TeamPageModule),
            },
            {
                path: '',
                redirectTo: '/tabs/tab3',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/tab3',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
