import { PostSegmentDto } from "../dto/PostSegmentDto";
import { Status } from "./Status";

export enum Type {
  text = "Text",
  alias = "Alias",
  url = "URL",
  newline = "Newline",
}

export class PostSegment {
  private _text: string;
  private _startPostion: number;
  private _endPosition: number;
  private _type: Type;

  public constructor(
    text: string,
    startPosition: number,
    endPosition: number,
    type: Type
  ) {
    this._text = text;
    this._startPostion = startPosition;
    this._endPosition = endPosition;
    this._type = type;
  }

  public get text(): string {
    return this._text;
  }

  public get startPostion(): number {
    return this._startPostion;
  }

  public get endPosition(): number {
    return this._endPosition;
  }

  public get type(): Type {
    return this._type;
  }

  public static fromDto(dto: PostSegmentDto | null): PostSegment | null {
    // if (dto == null) return null; // Early return if dto is null

    // const user = User.fromDto(dto.user);
    // if (user == null) return null; // Early return if user is null

    // // At this point, user is definitely a User
    // const finalUser: User = user;
    // return new PostSegment(dto.post, finalUser, dto.timestamp);
    return dto == null ? null: new PostSegment(dto.text, dto.startPosition, dto.endPosition, dto.type);
}

  public get dto() : PostSegmentDto {
    return{
      text: this.text,
      startPosition: this.startPostion,
      endPosition: this.endPosition,
      type: this.type
    }
  }
}
