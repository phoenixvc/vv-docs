#!/usr/bin/env python3

"""
Metadata Extraction Script for Markdown Files

This script extracts frontmatter metadata from markdown files and outputs
it in a structured format (JSON, CSV, or YAML). It can process individual
files or entire directories recursively.

Usage:
  python extract_metadata.py <path> [--output=<output-file>] [--format=json|csv|yaml]

Examples:
  python extract_metadata.py ./docs
  python extract_metadata.py ./docs/architecture --output=metadata.json
  python extract_metadata.py ./docs/tokenomics --format=csv --output=tokenomics-metadata.csv
"""

import os
import sys
import re
import json
import csv
import yaml
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional, Union

# Regular expressions for frontmatter extraction
YAML_FRONTMATTER_PATTERN = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.DOTALL)
JSON_FRONTMATTER_PATTERN = re.compile(r'^```json\s*\n(.*?)\n```\s*\n', re.DOTALL)

def extract_metadata_from_file(file_path: str) -> Dict[str, Any]:
    """
    Extract metadata from a markdown file
    
    Args:
        file_path: Path to the markdown file
        
    Returns:
        Dictionary containing the extracted metadata and file information
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Extract YAML frontmatter
        yaml_match = YAML_FRONTMATTER_PATTERN.match(content)
        if yaml_match:
            try:
                metadata = yaml.safe_load(yaml_match.group(1))
                main_content = content[yaml_match.end():]
            except yaml.YAMLError as e:
                return {
                    'file_path': file_path,
                    'error': f"YAML parsing error: {str(e)}"
                }
        
        # Extract JSON frontmatter if YAML not found
        elif JSON_FRONTMATTER_PATTERN.match(content):
            json_match = JSON_FRONTMATTER_PATTERN.match(content)
            try:
                metadata = json.loads(json_match.group(1))
                main_content = content[json_match.end():]
            except json.JSONDecodeError as e:
                return {
                    'file_path': file_path,
                    'error': f"JSON parsing error: {str(e)}"
                }
        
        # No frontmatter found
        else:
            metadata = {}
            main_content = content
        
        # Calculate additional metadata
        word_count = len(main_content.split())
        reading_time = (word_count + 199) // 200  # Ceiling division, assuming 200 words per minute
        
        # Get file information
        file_stats = os.stat(file_path)
        last_modified = datetime.fromtimestamp(file_stats.st_mtime).isoformat()
        
        # Add file information to metadata
        result = {
            'file_path': file_path,
            'file_name': os.path.basename(file_path),
            'directory': os.path.dirname(file_path),
            'last_modified': last_modified,
            'word_count': word_count,
            'reading_time_minutes': reading_time,
            **metadata
        }
        
        return result
    
    except Exception as e:
        return {
            'file_path': file_path,
            'error': str(e)
        }

def process_directory(dir_path: str) -> List[Dict[str, Any]]:
    """
    Process a directory recursively to find all markdown files
    
    Args:
        dir_path: Path to the directory
        
    Returns:
        List of metadata dictionaries
    """
    results = []
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith(('.md', '.mdx')):
                file_path = os.path.join(root, file)
                metadata = extract_metadata_from_file(file_path)
                results.append(metadata)
    
    return results

def save_output(metadata: List[Dict[str, Any]], output_file: str, output_format: str) -> None:
    """
    Save metadata to the specified output file in the requested format
    
    Args:
        metadata: List of metadata dictionaries
        output_file: Path to the output file
        output_format: Format to save the output (json, csv, or yaml)
    """
    if output_format == 'json':
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2)
    
    elif output_format == 'csv':
        # Get all possible field names from all metadata entries
        fieldnames = set()
        for entry in metadata:
            fieldnames.update(entry.keys())
        
        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=sorted(fieldnames))
            writer.writeheader()
            writer.writerows(metadata)
    
    elif output_format == 'yaml':
        with open(output_file, 'w', encoding='utf-8') as f:
            yaml.dump(metadata, f, sort_keys=False)

def main():
    """Main function to parse arguments and run the script"""
    parser = argparse.ArgumentParser(description='Extract metadata from markdown files')
    parser.add_argument('path', help='Path to markdown file or directory')
    parser.add_argument('--output', default='metadata-output.json', help='Output file path')
    parser.add_argument('--format', choices=['json', 'csv', 'yaml'], default='json', help='Output format')
    
    args = parser.parse_args()
    
    input_path = args.path
    output_format = args.format
    output_file = args.output
    
    # Ensure output file extension matches format
    if output_format == 'json' and not output_file.endswith('.json'):
        output_file += '.json'
    elif output_format == 'csv' and not output_file.endswith('.csv'):
        output_file += '.csv'
    elif output_format == 'yaml' and not (output_file.endswith('.yml') or output_file.endswith('.yaml')):
        output_file += '.yaml'
    
    print(f"Processing {input_path}...")
    
    try:
        if os.path.isdir(input_path):
            all_metadata = process_directory(input_path)
        elif os.path.isfile(input_path) and input_path.endswith(('.md', '.mdx')):
            all_metadata = [extract_metadata_from_file(input_path)]
        else:
            print("Error: Input path must be a markdown file or directory")
            sys.exit(1)
        
        if not all_metadata:
            print("No markdown files found.")
            return
        
        print(f"Found {len(all_metadata)} markdown files.")
        
        # Save the output
        save_output(all_metadata, output_file, output_format)
        print(f"Metadata saved to {output_file}")
        
        # Print summary of metadata fields
        metadata_fields = set()
        for item in all_metadata:
            metadata_fields.update(item.keys())
        
        print("\nMetadata fields found:")
        print(", ".join(sorted(metadata_fields)))
        
        # Print error summary if any
        errors = [item for item in all_metadata if 'error' in item]
        if errors:
            print(f"\nErrors encountered in {len(errors)} files:")
            for error in errors:
                print(f"  {error['file_path']}: {error['error']}")
    
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
