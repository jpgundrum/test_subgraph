import { AddAttribute, UpdateAttribute, RemoveAttribte } from '../generated/DID/did_sol';
import { Attribute } from '../generated/schema';
import { Bytes, log, store } from '@graphprotocol/graph-ts';


function generateId(did_account: Bytes, name: Bytes): string {
  return did_account.toHex() + '-' + name.toHex();
}

export function handleNewDid(event: AddAttribute): void {
  log.info('NewDid event: sender {}, didAccount {}, name {}, value {}, validity {}', [
    event.params.sender.toHex(),
    event.params.did_account.toHex(),
    event.params.name.toString(),
    event.params.value.toString(),
    event.params.validity.toString()
  ]);


  // Create a unique id for each AddedAttribute entity based on the did_account and parameter name
  let id = generateId(event.params.did_account, event.params.name);
  let addedDid = new Attribute(id);
  addedDid.id = id;
  addedDid.sender = event.params.sender.toHex();
  addedDid.didAccount = event.params.did_account.toHex();
  addedDid.name = event.params.name.toString();
  addedDid.value = event.params.value.toHex();
  addedDid.validity = event.params.validity.toHex();

  addedDid.save();
}

export function handleUpdateDid(event: UpdateAttribute): void {
  log.info('UpdateDid event: sender {}, didAccount {}, name {}, value {}, validity {}', [
    event.params.sender.toHex(),
    event.params.did_account.toHex(),
    event.params.name.toString(),
    event.params.value.toString(),
    event.params.validity.toString()
  ]);

  // Generate the same id used for creation
  let id = generateId(event.params.did_account, event.params.name);
  let updatedDid = Attribute.load(id);

  if (updatedDid == null) {
    log.warning('No AddedAttribute entity found with ID: {}', [id]);
    return;
  }

  updatedDid.id = id;
  updatedDid.sender = event.params.sender.toHex();
  updatedDid.didAccount = event.params.did_account.toHex();
  updatedDid.name = event.params.name.toString();
  updatedDid.value = event.params.value.toHex();
  updatedDid.validity = event.params.validity.toHex();

  updatedDid.save();
}

export function handleRemoveDid(event: RemoveAttribte): void {
  log.info('RemoveDid event: didAccount {}, name {}', [
    event.params.did_account.toHex(),
    event.params.name.toString(),
  ]);
  let id = generateId(event.params.did_account, event.params.name);
  let removeDid = Attribute.load(id);

  if (removeDid != null) {
    store.remove('Attribute', id);
    log.info('Removed Attribute entity with ID: {}', [id]);
  } else {
    log.warning('No Attribute entity found with ID: {} to remove', [id]);
  }
}
