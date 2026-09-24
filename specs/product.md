# Product Specification

## Name
Contentful MCP Server

## Purpose
A Model Context Protocol (MCP) server that allows AI clients (such as Cursor) to query entries from a Contentful space over stdio.

## Users
Developers and content editors using AI coding assistants.

## Current Behavior & Capabilities
- **Tool Registered**: `get_contentful_entries`
- **Data Source**: Contentful Content Delivery API (CDA) (`cdn.contentful.com`)
- **Authentication**: Server-side `.env` configuration (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`)

## Future / Target Improvements
- Search and filter entries by content type, query parameters, or locale
- Retrieve specific entry by ID
- Retrieve content types and assets
- Dedicated service layer separation (`server/services/contentful.js`)
