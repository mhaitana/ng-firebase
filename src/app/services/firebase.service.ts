import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }

  getCollection(collection: string): Observable<DocumentChangeAction<any>[]> {
    return this.db.collection(collection).snapshotChanges();
  }

  getNestedCollection(collection: string, document: string, subCollection: string): Observable<DocumentChangeAction<any>[]> {
    return this.db.collection(collection).doc(document).collection(subCollection).snapshotChanges();
  }

  createDocument(collection: string, documentId: string, data: any): any {
    return this.db
      .collection(collection)
      .doc(documentId)
      .get().subscribe(doc => {
        if (!doc.exists) {
          doc.ref.set(data);
          return doc.data();
        }
        return {};
      });
  }

  createNestedDocument(collection: string, documentId: string, nestedCollection: string, nestedDocumentId: string, data: any): any {
    return this.db
      .collection(collection)
      .doc(documentId)
      .collection(nestedCollection)
      .doc(nestedDocumentId)
      .get().subscribe(doc => {
        if (!doc.exists) {
          doc.ref.set(data);
          return doc.data();
        }
        return {};
      });
  }

  getDocument(
    collection: string,
    documentId: string
  ): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.db
      .collection(collection)
      .doc(documentId)
      .get();
  }

  getNestedDocument(
    collection: string,
    documentId: string,
    nestedCollection: string,
    nestedDocumentId: string
  ): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.db
      .collection(collection)
      .doc(documentId)
      .collection(nestedCollection)
      .doc(nestedDocumentId)
      .get();
  }
}
