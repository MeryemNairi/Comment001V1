import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Comment001 } from './components/Comment001';

export interface IComment001WebPartProps {
  description: string;
  userDisplayName: string;
}

export default class Comment001WebPart extends BaseClientSideWebPart<IComment001WebPartProps> {
  public render(): void {
    const element = React.createElement(
      Comment001,
      {
        description: this.properties.description,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }
}
