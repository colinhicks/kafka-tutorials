declare interface AbstractNode {
    getNodeName(): any;
    getAttributes(): any;
    getAttribute(name: string, defaultValue: any, inherit: any): any;
    hasAttribute(name: string): any;
    isAttribute(name: string, expectedValue: any, inherit: any): any;
    setAttribute(name: string, value: any, overwrite: any): any;
    removeAttribute(name: string): any;
    getDocument(): any;
    getParent(): any;
    isInline(): any;
    isBlock(): any;
    isRole(expected: boolean): any;
    getRole(): any;
    hasRole(name: string): any;
    getRoles(): any;
    addRole(name: string): any;
    removeRole(name: string): any;
    isReftext(): any;
    getReftext(): any;
    getContext(): string;
    getId(): any;
    isOption(name: string): any;
    setOption(name: string): any;
    getIconUri(name: string): any;
    getMediaUri(target: any, assetDirKey: any): any;
    getImageUri(targetImage: any, assetDirKey: any): any;
    getConverter(): any;
    readContents(target: any, options: object): any;
    readAsset(path: string, options: object): any;
    normalizeWebPath(target: any, start: any, preserveTargetUri: any): any;
    normalizeSystemPath(target: any, start: any, jail: any, options: object): any;
    normalizeAssetPath(assetRef: any, assetName: any, autoCorrect: any): any;
}

declare interface AbstractBlock extends AbstractNode {
    append(block: AbstractBlock): AbstractBlock;
    getTitle(): string;
    getCaptionedTitle(): string;
    getStyle(): string;
    getCaption(): string;
    setCaption(caption: string): void;
    getLevel(): number;
    getSubstitutions(): string[];
    hasSubstitution(substitution: string): boolean;
    removeSubstitution(substitution: string): void;
    hasBlocks(): boolean;
    getBlocks(): AbstractBlock[];
    getContent(): string;
    convert(): string;
    findBy(selector?: object, block?: (block: AbstractBlock) => boolean): AbstractBlock[];
    getLineNumber(): number;
    hasSections(): boolean;
    getSections(): Section[];
    getNumeral(): string;
    setNumeral(value: any): void;
    hasTitle(): boolean;
}

declare interface Section extends AbstractBlock {
    getIndex(): number;
    setIndex(value: number): void;
    getSectionName(): string;
    setSectionName(value: string): void;
    isSpecial(): boolean;
    setSpecial(value: boolean): void;
    isNumbered(): boolean;
    getCaption(): string;
    getName(): string;
}

declare interface AsciidoctorDocument extends AbstractBlock {
    getRefs(): Record<string, AbstractNode>;
    getImages(): ImageReference[];
    getLinks(): string[];
    hasFootnotes(): boolean;
    getFootnotes(): Footnote[];
    getHeader(): string;
    setAttribute(name: string, value: any): void;
    removeAttribute(name: string): void;
    convert(options?: object): string;
    write(output: any, target: any): any;
    getAuthor(): string;
    getSource(): string;
    getSourceLines(): any;
    isNested(): boolean;
    isEmbedded(): boolean;
    hasExtensions(): boolean;
    getDoctype(): string;
    getBackend(): string;
    //isBasebackend(base): boolean;
    getTitle(): string;
    setTitle(title: string): void;
    getDocumentTitle(options: object): Title;
    //getDoctitle: ;
    getCatalog(): any;
    //getReferences: ;
    getRevisionDate(): string;
    //getRevdate(): ;
    getRevisionNumber(): any;
    getRevisionRemark(): string;
    setHeaderAttribute(name: string, value: any, overwrite: any): void;
    getAuthors(): Author[];
    //getRevisionInfo(): RevisionInfo;
    hasRevisionInfo(): boolean;
    //getNotitle(): ;
    //getNoheader(): ;
    //getNofooter(): ;
    hasHeader(): boolean;
    deleteAttribute(name: string): void;
    isAttributeLocked(name: string): boolean;
    parse(data: any): any;
    //getDocinfo(docinfoLocation, suffix): ;
    //hasDocinfoProcessors(docinfoLocation): ;
    //counterIncrement(counterName, block): ;
    //counter(name, seed): ;
    //getSafe(): ;
    //getCompatMode(): ;
    //getSourcemap(): ;
    //getCounters(): ;
    //getCallouts(): ;
    //getBaseDir(): ;
    //getOptions(): ;
    //getOutfilesuffix(): ;
    //getParentDocument(): ;
    //getReader(): ;
    //getConverter(): ;
    //getExtensions(): ;

}

declare interface Inline extends AbstractNode {
    create(parent: any, context: any, text: any, opts: any): string;
    convert(): string;
    getText(): string;
    getType(): string;
    getTarget(): string;
}

declare interface List extends AbstractBlock {
    hasItems(): boolean;
    getItems(): ListItem[];
}

declare interface ListItem extends AbstractBlock {
    getText(): string;
    setText(text: string): void;
    hasText(): boolean;
    getMarker(): string;
    setMarker(marker: string): void;
    getList(): List;
    getParent(): AbstractBlock;
}

declare interface Title {
    getMain(): string;
    getCombined(): string;
    getSubtitle(): string;
    isSanitized(): boolean;
    hasSubtitle(): boolean;
}

declare interface Footnote {
    getIndex(): number;
    getId(): string;
    getText(): string;
}

declare interface ImageReference {
    getTarget(): string;
    getImagesDirectory(): string;
}

declare interface Author {
    getName(): string;
    getFirstName(): string;
    getMiddleName(): string;
    getLastName(): string;
    getInitials(): string;
    getEmail(): string;
}

declare interface AsciidoctorRuntime {
    ioModule: string;
    platform: string;
    engine: string;
    framework: string;
}

declare interface ProcessorContext {
    process(cb: (doc: AsciidoctorDocument) => AsciidoctorDocument): any;
}

type ProcessorImpl = ThisType<ProcessorContext>;

declare interface Registry {
    treeProcessor(name: string, processor: ProcessorImpl): void;
    treeProcessor(processor: ProcessorImpl): void;

}

declare interface Extensions {
    create(): Registry;
}

declare interface Asciidoctor {
    getVersion(): string;
    getCoreVersion(): string;
    getRuntime(): AsciidoctorRuntime;
    convert(input: string | Buffer, options?: any): string | AsciidoctorDocument;
    convertFile(filename: string, options?: any): string | AsciidoctorDocument;
    load(input: string | Buffer, options?: any): AsciidoctorDocument;
    loadFile(filename: string, options?: any): AsciidoctorDocument;
    toString(): string;
    Extensions: Extensions;
}

declare function asciidoctor(): Asciidoctor;

declare module "@asciidoctor/core" {
    export = asciidoctor;
}
