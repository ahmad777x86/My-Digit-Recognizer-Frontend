import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (bootstrapcontext: BootstrapContext) => bootstrapApplication(App, config, bootstrapcontext);

export default bootstrap;
