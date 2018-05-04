import { IManufacturerConfig, IPeopleConfig } from '../definitions/config';
import { TPrimaryDirectory, TSecondaryDirectory } from '../definitions/directory';
import { TStatusType } from '../definitions/status_types';

export const kAppName = 'Arborist';
export const kCompanyName = 'Bonsai';
export const kBonsaiLink = 'http://360bonsai.com/?utm_source=arboristv2';
export const kGitHubLink = 'https://github.com/daviseford/arborist-v2/';
export const kVersion = require('./../package.json').version;

export const kRoutes = {
    ABOUT: '/about',
    ARBORIST: '/arborist',
    DIRECTORIES: '/directories',
    FAQ: '/faq',
    ROOT: '/',
    WILDCARD: '*',
};

export const kPeople: IPeopleConfig = {
    BRAUM: {
        first_name: 'Braum',
        full_name: 'Braum Katz',
        last_name: 'Katz',
        title: 'CEO',
    },
    CHARLES: {
        first_name: 'Charles',
        full_name: 'Charles Blatz',
        last_name: 'Blatz',
        title: 'Producer',
    },
    DAVIS: {
        first_name: 'Davis',
        full_name: 'Davis Ford',
        last_name: 'Ford',
        title: 'Developer',
    },
};

export const kStatusTypes: { [P in TStatusType]: TStatusType } = {
    analysis: 'analysis',
    copy_file_done: 'copy_file_done',
    copy_file_start: 'copy_file_start',
    copy_files_done: 'copy_files_done',
    copy_files_start: 'copy_files_start',
    copy_list_update: 'copy_list_update',
    error: 'error',
    general: 'general',
    xml_copy_done: 'xml_copy_done',
    xml_copy_start: 'xml_copy_start',
};

export const kDirectoryPrimary: TPrimaryDirectory = 'dir-primary';
export const kDirectorySeconday: TSecondaryDirectory = 'dir-secondary';
export const kDefaultCameraNumber = 4;
export const kMaxCameraNumber = 10;

export const kCameraManufacturers: IManufacturerConfig = {
    SAMSUNG_MOCK: {
        name: 'Samsung (Mock)',
        supported_models: ['FAKE_MODEL1', 'XX-23-14', 'FAKE_M2.0'],
    },
    SONY: {
        name: 'Sony',
        supported_models: ['ILCE-7SM2'],
    },
};
