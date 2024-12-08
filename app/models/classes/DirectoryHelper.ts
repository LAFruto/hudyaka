import fs from "fs/promises";
import { existsSync } from "fs";

// Credit to chrishoermann for the class template

/////////////////////////////////////////
//  INTERFACE
/////////////////////////////////////////

export type CreateDirOptions = {
  recursive: true;
  mode?: number; // Allows setting permissions
};

/////////////////////////////////////////
//  CLASS
/////////////////////////////////////////

export class DirectoryHelper {
  /**
   * Checks if the given path is a directory.
   * @param path Path to check.
   * @returns Promise resolving to true if the path is a directory, otherwise false.
   */
  static async isDirectory(path: string): Promise<boolean> {
    try {
      const stats = await fs.stat(path);
      return stats.isDirectory();
    } catch {
      return false; // Return false if path doesn't exist or isn't a directory
    }
  }
  /**
   * Checks if a directory already exists. If not, the directory is created.
   * @param path Path that should be checked/created.
   * @returns Promise resolving to true if created or exists, otherwise false.
   */
  static pathExistsElseCreate = async (
    path: string,
    options?: CreateDirOptions
  ): Promise<boolean> => {
    if (this.pathOrDirExists(path)) return true;
    await this.createDir(path, options);
    return this.pathOrDirExists(path);
  };

  /**
   * Creates a new directory at the specified path.
   * @param path Path to create the directory.
   * @param options Options for directory creation.
   * @returns Promise resolving to the created path as a string if successful, otherwise undefined.
   */
  static createDir = async (
    path: string,
    options?: CreateDirOptions
  ): Promise<string | undefined> => {
    try {
      await fs.mkdir(path, options || { recursive: true });
      return this.pathOrDirExists(path) ? path : undefined;
    } catch (error) {
      console.error(`Failed to create directory at ${path}:`, error);
      return undefined;
    }
  };

  /**
   * Checks if a path to a file or directory exists.
   * @param path Path to check.
   * @returns True if the path exists, otherwise false.
   */
  static pathOrDirExists = (path: string): boolean => existsSync(path);

  /**
   * Removes a directory at the specified path.
   * @param path Path to the directory to be removed.
   * @returns Promise resolving when the directory has been removed.
   * @throws Error if the path is not specified or the operation fails.
   */
  static removeDir = async (path?: string | null): Promise<void> => {
    if (!path) throw new Error("No path specified");
    if (!this.pathOrDirExists(path)) return;
    try {
      await fs.rm(path, { recursive: true, force: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error while deleting directory at ${path}: ${error.message}`
        );
      }
    }
  };

  /**
   * Checks if a directory exists, creates it if it doesn't, and returns the path.
   * @param path Directory path to check or create.
   * @param options Options for directory creation.
   * @returns Promise resolving to the path if it exists or is successfully created.
   */
  static getOrCreatePath = async (
    path: string,
    options?: CreateDirOptions
  ): Promise<string> => {
    if (this.pathOrDirExists(path)) {
      return path; // Path exists, return it
    }

    try {
      await fs.mkdir(path, options || { recursive: true });
      return path; // Return the directory after creation
    } catch (error) {
      throw new Error(
        `Failed to create or access the directory at ${path}: ${error}`
      );
    }
  };
}
