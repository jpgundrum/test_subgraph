import { log } from '@graphprotocol/graph-ts';
import { NewDid } from '../generated/PeaqDid/PeaqDid'
import { DidDocument } from '../generated/schema'

export function handleNewDid(event: NewDid): void {
  log.info('NewDid event: id {}, contorller {}', [
    event.params.id,
    event.params.controller
  ]);
  let did = new DidDocument(event.params.id)
  did.id = event.params.id
  did.controller = event.params.controller
  did.save()
}