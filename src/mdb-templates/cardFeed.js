/* This function returns a json template for a new corporate card feed record. */

export const cardFeed = () => {
  return `{
        "organizationId" : ObjectId("orgid"),
        "settings" : {
            "companyIds" : [
                "[company id]"
            ],
            "filePrefix" : "[file prefix]",
            "bucket" : "[aws bucket]"
        },
        "status" : "enabled",
        "type" : "CorpCardSync",
        "provider" : "[bank name]"

            {
        "type": "integrations.corporate-card-bulk-sync",
        "data": {
            "bucket": "",
            "files": []
        }
    }
    }`;
};