export interface EntityWithKey<TKey extends string | number> {
  id: TKey;
}

export interface EntityWithKeyAndActive<TKey extends string | number> {
  id: TKey;
  active: boolean;
}
