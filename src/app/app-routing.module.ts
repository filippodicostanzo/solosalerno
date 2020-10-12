import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
        {
            path: '',
            loadChildren: () =>
                import('../pages/tabs/tabs.module').then((m) => m.TabsPageModule),
        },
        {
            path: 'post/:item_id',
            loadChildren: () =>
                import('../pages/post/post.module').then((m) => m.PostPageModule),
        },
        {
            path: 'archive/:type/:id',
            loadChildren: () =>
                import('../pages/archive/archive.module').then((m) => m.ArchivePageModule),
        }

    ];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ],
    exports: [RouterModule],
})
// @ts-ignore
export class AppRoutingModule {
}
