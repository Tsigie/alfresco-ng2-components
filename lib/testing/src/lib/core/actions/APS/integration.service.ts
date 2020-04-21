/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
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

import { AlfrescoApiCompatibility as AlfrescoApi } from '@alfresco/js-api';

export class IntegrationService {
    api: AlfrescoApi;

    constructor(api: AlfrescoApi) {
        this.api = api;
    }

    addCSIntegration({ name, tenantId, host }): Promise<any> {
        const repository = {
            name,
            tenantId,
            alfrescoTenantId: '',
            repositoryUrl: `${host}/alfresco`,
            shareUrl: `${host}/share`,
            version: '4.2',
            useShareConnector: false
        };
        return this.api.activiti.integrationAccountApi.apiClient.callApi('app/rest/integration/alfresco', 'POST',
            {}, {}, {}, {}, repository, [], [], Object);
    }

    authenticateRepository(id: number, body: { username: string, password: string }): Promise<any> {
        return this.api.activiti.integrationAccountApi.apiClient.callApi(`app/rest/integration/alfresco/${id}/account`, 'POST',
            {}, {}, {}, body, {}, [], []);
    }
}
