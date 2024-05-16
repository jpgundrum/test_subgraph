import { NewDid } from '../generated/PeaqDid/PeaqDid';
import { DidDocument, NameToDidDocument } from '../generated/schema';
import { log } from '@graphprotocol/graph-ts';

export function handleNewDid(event: NewDid): void {
  log.info('NewDid event: didName {}, didDoc {}', [
    event.params.didName,
    event.params.didDoc.id,
    event.params.didDoc.controller
  ]);

  // Create and save the DidDocument entity
  let did = new DidDocument(event.params.didDoc.id);
  did.id = event.params.didDoc.id;
  did.controller = event.params.didDoc.controller;
  did.save();

  // Create and save the NameToDidDocument entity
  let nameToDidDocument = new NameToDidDocument(event.params.didName);
  nameToDidDocument.id = event.params.didName;
  nameToDidDocument.didDocument = did.id;
  nameToDidDocument.save();
}