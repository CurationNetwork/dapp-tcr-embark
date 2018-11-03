export const spec = {
  "$comment": "DApp meta-information specification. Main specification. Inspired by https://github.com/eth-registry/EIPs/blob/cb330ebc981874b4a3b2c7f4b944988e2f5ace01/EIPS/eip-1357.md",

  "$schema": "http://json-schema.org/draft-04/schema#",

  "type": "object",
  "required": ["spec_version", "prev_meta", "addresses", "metadata"],

  "properties": {
    "spec_version": {
      "$comment": "version of DApp metainfo specification to use",
      "$ref": "#/definitions/semver"
    },

    "prev_meta": {
      "$comment": "hash of previous version of this DApp metainfo",
      "$ref": "#/definitions/ipfs_file_link"
    },

    "addresses": {
      "$comment": "DApp smart contact addresses",
      "type": "array",
      "items": {"$ref": "#/definitions/eth_address"}
    },

    "metadata": {
      "$comment": "metainfo details",
      "type": "object",
      "required": ["name"],

      "properties": {
        "name": {"type": "string"},
        "description": {"type": "string"},

        "url": {
          "$comment": "official website of the DApp",
          "type": "string"
        },

        "github_url": {
          "$comment": "github link of the DApp",
          "type": "string"
        },

        "logo": {
          "$comment": "logo of the DApp",
          "$ref": "#/definitions/image"
        },

        "images": {
          "$comment": "additional images (DApp UI screenshots, etc)",
          "type": "array",
          "items": {"$ref": "#/definitions/image"}
        }
      }
    },

    "submission_comment": {
      "$comment": "comment related to last update (like commit message)",
      "type": "string"
    }
  },

  "additionalProperties": {
    "$comment": "additional properties are modules, which have their own specs",
    "$ref": "#/definitions/module"
  },

  "definitions": {
    "semver": {
      "$comment": "semantic versioning",
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },

    "ipfs_file_link": {
      "type": "string",
      "maxLength": 80
    },

    "eth_address": {
      "type": "string",
      "pattern": "^(?:0[Xx])?[0-9a-fA-F]{40}|[a-z0-9\\.]+\\.eth$"
    },

    "image": {
      "$ref": "#/definitions/ipfs_file_link"
    },

    "module": {
      "$comment": "We are splitting spec into modules to make spec negotiation more flexible. The only required field for a module is (it's) spec version. Other fields are module-dependent.",
      "type": "object",
      "required": ["spec_version"],
      "properties": {
        "spec_version": {"$ref": "#/definitions/semver"}
      }
    }
  }
}