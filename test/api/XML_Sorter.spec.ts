/* eslint-disable func-names */
// tslint:disable:only-arrow-functions
'use strict';
import { expect } from 'chai';
import * as fs from 'fs-extra';
import * as path from 'path';
import Types from '../../app/api/Types';
import XML_Sorter from '../../app/api/XML_Sorter';

describe('XML Sorter - Should sort test directory correctly', () => {
  const test_dir = path.join(__dirname, '../xml_tests');
  it('Should return an analysis Type with the correct copy_list', function(done) {
    const sorter = new XML_Sorter(test_dir, (type, data) => {
      expect(type).to.equal(Types.analysis);
      expect(data.length).to.equal(4);
      const firstSrc = data[0].filepath.split(path.sep);
      const firstDest = data[0].dest.split(path.sep);
      expect(firstSrc.slice(firstSrc.length - 2).join(path.sep)).to.equal(`A${path.sep}C0001.MP4`);
      // tslint:disable-next-line:max-line-length
      expect(firstDest.slice(firstDest.length - 3).join(path.sep)).to.equal(`Scenes${path.sep}Scene_1${path.sep}A_C0001.MP4`);
      expect(data[3].done).to.equal(false);
      expect(data[2].copying).to.equal(false);
      done();
    });
    sorter.process();
  });

  it('Should create the Scenes folder and two Scene_ subdirs', function(done) {
    // Delete existing stuff
    fs.removeSync(path.join(test_dir, 'Scenes'));

    const sorter = new XML_Sorter(test_dir, (type, data) => {
      if (type === Types.copy_files_done) {
        expect(data.every((x) => x.done)).to.equal(true);
        expect(data.every((x) => x.done_xml)).to.equal(true);
        // Check files
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_1'))).to.equal(true);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_2'))).to.equal(true);
        // Should only create two scenes
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_0'))).to.equal(false);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_3'))).to.equal(false);

        done();
      }
    }, true);
    sorter.process();
  });

  it('Should copy the correct MP4 files', function(done) {
    // Delete existing stuff
    fs.removeSync(path.join(test_dir, 'Scenes'));

    const sorter = new XML_Sorter(test_dir, (type, data) => {
      if (type === Types.copy_files_done) {

        // Check files
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_1', 'A_C0001.MP4'))).to.equal(true);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_1', 'C_C0001.MP4'))).to.equal(true);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_2', 'A_C0002.MP4'))).to.equal(true);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_2', 'C_C0002.MP4'))).to.equal(true);

        // Should only bring over files from A and C, not B
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_1', 'B_C0001.MP4'))).to.equal(false);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_2', 'B_C0002.MP4'))).to.equal(false);

        done();
      }
    }, true);
    sorter.process();
  });

  it('Should copy the associated XML files', function(done) {
    // Delete existing stuff
    fs.removeSync(path.join(test_dir, 'Scenes'));

    const sorter = new XML_Sorter(test_dir, (type, data) => {
      if (type === Types.xml_copy_done) {
        // Check files
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_1', 'A_C0001M01.XML'))).to.equal(true);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_1', 'C_C0001M01.XML'))).to.equal(true);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_2', 'A_C0002M01.XML'))).to.equal(true);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_2', 'C_C0002M01.XML'))).to.equal(true);

        // Should only bring over files from A and C, not B
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_1', 'B_C0001M01.XML'))).to.equal(false);
        expect(fs.existsSync(path.join(test_dir, 'Scenes', 'Scene_2', 'B_C0002M01.XML'))).to.equal(false);

        done();
      }
    }, true);
    sorter.process();
  });

});
