/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CommentModel } from '../models/comment.model';
import { AlfrescoApiService } from '../services/alfresco-api.service';
import { LogService } from '../services/log.service';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CommentContentService {

    constructor(private apiService: AlfrescoApiService,
                private logService: LogService) {
    }

    /**
     * Adds a comment to a node.
     * @param nodeId ID of the target node
     * @param message Text for the comment
     * @returns Details of the comment added
     */
    addNodeComment(nodeId: string, message: string): Observable<CommentModel> {
        return Observable.fromPromise(this.apiService.getInstance().core.commentsApi.addComment(nodeId, {content: message}))
            .map((response: any) => {
                return new CommentModel({
                    id: response.entry.id,
                    message: response.entry.content,
                    created: response.entry.createdAt,
                    createdBy: response.entry.createdBy
                });
            }).catch(err => this.handleError(err));
    }

    /**
     * Gets all comments that have been added to a node.
     * @param nodeId ID of the target node
     * @returns Details for each comment
     */
    getNodeComments(nodeId: string): Observable<CommentModel[]> {
        return Observable.fromPromise(this.apiService.getInstance().core.commentsApi.getComments(nodeId))
            .map((response: any) => {
                const comments: CommentModel[] = [];
                response.list.entries.forEach((comment: any) => {
                    comments.push(new CommentModel({
                        id: comment.entry.id,
                        message: comment.entry.content,
                        created: comment.entry.createdAt,
                        createdBy: comment.entry.createdBy
                    }));
                });
                return comments;
            }).catch(err => this.handleError(err));
    }

    private handleError(error: any) {
        this.logService.error(error);
        return Observable.throw(error || 'Server error');
    }

}
