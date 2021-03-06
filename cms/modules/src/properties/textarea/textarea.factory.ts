import { Injectable, Injector } from '@angular/core';

import { CmsPropertyFactory, UIHint } from '@angular-cms/core';
import { TextareaProperty } from './textarea.property';

@Injectable()
export class TextareaPropertyFactory extends CmsPropertyFactory {
    constructor(injector: Injector) {
        super(injector, UIHint.Textarea, TextareaProperty);
    }
}